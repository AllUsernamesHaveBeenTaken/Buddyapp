defmodule Buddy.Posts do
  @moduledoc """
  The Posts context.
  """

  import Ecto.Query, warn: false
  alias Buddy.Repo

  alias Buddy.Posts.Gig
  alias Buddy.Accounts.Friend

  @doc """
  Returns the list of gigs.

  ## Examples

      iex> list_gigs()
      [%Gig{}, ...]

  """
  def list_gigs do
    query = from g in Gig,
          order_by: [desc: :inserted_at]
    Repo.all(query)
  end

  @doc """
  Gets a single gig.

  Raises `Ecto.NoResultsError` if the Gig does not exist.

  ## Examples

      iex> get_gig!(123)
      %Gig{}

      iex> get_gig!(456)
      ** (Ecto.NoResultsError)

  """
  def get_gig!(id), do: Repo.get!(Gig, id)

  @doc """
  Creates a gig.

  ## Examples

      iex> create_gig(%{field: value})
      {:ok, %Gig{}}

      iex> create_gig(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_gig(attrs \\ %{}) do
    %Gig{}
    |> Gig.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a gig.

  ## Examples

      iex> update_gig(gig, %{field: new_value})
      {:ok, %Gig{}}

      iex> update_gig(gig, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_gig(%Gig{} = gig, attrs) do
    gig
    |> Gig.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Gig.

  ## Examples

      iex> delete_gig(gig)
      {:ok, %Gig{}}

      iex> delete_gig(gig)
      {:error, %Ecto.Changeset{}}

  """
  def delete_gig(%Gig{} = gig) do
    Repo.delete(gig)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking gig changes.

  ## Examples

      iex> change_gig(gig)
      %Ecto.Changeset{source: %Gig{}}

  """
  def change_gig(%Gig{} = gig) do
    Gig.changeset(gig, %{})
  end

  def list_gigs_friends(user_id) do
    query = from f1 in Friend,
            join: f2 in Friend, on: f1.friend_id == f2.user_id,
            join: g in Gig, on: g.user_id in [f1.user_id, f2.user_id],
            where: f1.user_id == ^user_id and f1.friend_id != ^user_id,            
            group_by: g.id,
            order_by: [asc: g.when],
            select: g
    Repo.all(query)
  end

  alias Buddy.Posts.Comment

  @doc """
  Returns the list of gig_comments.

  ## Examples

      iex> list_gig_comments()
      [%Comment{}, ...]

  """
  def list_gig_comments do
    Repo.all(Comment)
  end

  @doc """
  Gets a single comment.

  Raises `Ecto.NoResultsError` if the Comment does not exist.

  ## Examples

      iex> get_comment!(123)
      %Comment{}

      iex> get_comment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_comment!(id), do: Repo.get!(Comment, id)

  @doc """
  Creates a comment.

  ## Examples

      iex> create_comment(%{field: value})
      {:ok, %Comment{}}

      iex> create_comment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_comment(attrs \\ %{}) do
    %Comment{}
    |> Comment.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a comment.

  ## Examples

      iex> update_comment(comment, %{field: new_value})
      {:ok, %Comment{}}

      iex> update_comment(comment, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_comment(%Comment{} = comment, attrs) do
    comment
    |> Comment.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Comment.

  ## Examples

      iex> delete_comment(comment)
      {:ok, %Comment{}}

      iex> delete_comment(comment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_comment(%Comment{} = comment) do
    Repo.delete(comment)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking comment changes.

  ## Examples

      iex> change_comment(comment)
      %Ecto.Changeset{source: %Comment{}}

  """
  def change_comment(%Comment{} = comment) do
    Comment.changeset(comment, %{})
  end

  def get_comments_for_gig(gig_id) do
    query = from c in Comment,
            where: c.gig_id == ^gig_id,
            order_by: [desc: :inserted_at]
    Repo.all(query)
  end

end
