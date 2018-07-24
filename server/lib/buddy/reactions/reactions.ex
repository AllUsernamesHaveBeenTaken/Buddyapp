defmodule Buddy.Reactions do
  @moduledoc """
  The Reaction context.
  """

  import Ecto.Query, warn: false
  alias Buddy.Repo

  alias Buddy.Reactions.LikeGig
  alias Buddy.Reactions.GoingGig

  def like_gig(gig_id, user_id) do
    result = gig_like_exist(gig_id, user_id)

    if result == nil do
      create_like_gig(%{gig_id: gig_id, user_id: user_id})
      {:ok, true}
    else
      delete_like_gig(result)
      {:ok, false}
    end
  end

  def gig_is_liked(gig_id, user_id) do
    result = gig_like_exist(gig_id, user_id)

    if result == nil do
      {:ok, false}    
    else
      {:ok, true}
    end
  end

  def going_gig(gig_id, user_id) do
    result = gig_going_exist(gig_id, user_id)

    if result == nil do
      create_going_gig(%{gig_id: gig_id, user_id: user_id})
      {:ok, true}
    else
      delete_going_gig(result)
      {:ok, false}
    end
  end

  def is_going_to_gig(gig_id, user_id) do
    result = gig_going_exist(gig_id, user_id)

    if result == nil do
      {:ok, false}    
    else
      {:ok, true}
    end
  end

  @doc """
  Returns the list of like_gigs.

  ## Examples

      iex> list_like_gigs()
      [%LikeGig{}, ...]

  """
  def list_like_gigs do
    Repo.all(LikeGig)
  end

  @doc """
  Gets a single like_gig.

  Raises `Ecto.NoResultsError` if the Like gig does not exist.

  ## Examples

      iex> get_like_gig!(123)
      %LikeGig{}

      iex> get_like_gig!(456)
      ** (Ecto.NoResultsError)

  """
  def get_like_gig!(id), do: Repo.get!(LikeGig, id)

  @doc """
  Creates a like_gig.

  ## Examples

      iex> create_like_gig(%{field: value})
      {:ok, %LikeGig{}}

      iex> create_like_gig(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_like_gig(attrs \\ %{}) do
    %LikeGig{}
    |> LikeGig.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a like_gig.

  ## Examples

      iex> update_like_gig(like_gig, %{field: new_value})
      {:ok, %LikeGig{}}

      iex> update_like_gig(like_gig, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_like_gig(%LikeGig{} = like_gig, attrs) do
    like_gig
    |> LikeGig.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a LikeGig.

  ## Examples

      iex> delete_like_gig(like_gig)
      {:ok, %LikeGig{}}

      iex> delete_like_gig(like_gig)
      {:error, %Ecto.Changeset{}}

  """
  def delete_like_gig(%LikeGig{} = like_gig) do
    Repo.delete(like_gig)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking like_gig changes.

  ## Examples

      iex> change_like_gig(like_gig)
      %Ecto.Changeset{source: %LikeGig{}}

  """
  def change_like_gig(%LikeGig{} = like_gig) do
    LikeGig.changeset(like_gig, %{})
  end

  defp gig_like_exist(gig_id, user_id) do
      query = from g in LikeGig, 
              where: g.gig_id == ^gig_id and g.user_id == ^user_id
      
      Repo.one(query)
  end


  alias Buddy.Reactions.GoingGig

  @doc """
  Returns the list of going_gigs.

  ## Examples

      iex> list_going_gigs()
      [%GoingGig{}, ...]

  """
  def list_going_gigs do
    Repo.all(GoingGig)
  end

  @doc """
  Gets a single going_gig.

  Raises `Ecto.NoResultsError` if the Going gig does not exist.

  ## Examples

      iex> get_going_gig!(123)
      %GoingGig{}

      iex> get_going_gig!(456)
      ** (Ecto.NoResultsError)

  """
  def get_going_gig!(id), do: Repo.get!(GoingGig, id)

  @doc """
  Creates a going_gig.

  ## Examples

      iex> create_going_gig(%{field: value})
      {:ok, %GoingGig{}}

      iex> create_going_gig(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_going_gig(attrs \\ %{}) do
    %GoingGig{}
    |> GoingGig.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a going_gig.

  ## Examples

      iex> update_going_gig(going_gig, %{field: new_value})
      {:ok, %GoingGig{}}

      iex> update_going_gig(going_gig, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_going_gig(%GoingGig{} = going_gig, attrs) do
    going_gig
    |> GoingGig.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a GoingGig.

  ## Examples

      iex> delete_going_gig(going_gig)
      {:ok, %GoingGig{}}

      iex> delete_going_gig(going_gig)
      {:error, %Ecto.Changeset{}}

  """
  def delete_going_gig(%GoingGig{} = going_gig) do
    Repo.delete(going_gig)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking going_gig changes.

  ## Examples

      iex> change_going_gig(going_gig)
      %Ecto.Changeset{source: %GoingGig{}}

  """
  def change_going_gig(%GoingGig{} = going_gig) do
    GoingGig.changeset(going_gig, %{})
  end

  defp gig_going_exist(gig_id, user_id) do
      query = from g in GoingGig, 
              where: g.gig_id == ^gig_id and g.user_id == ^user_id
      
      Repo.one(query)
  end
  
end