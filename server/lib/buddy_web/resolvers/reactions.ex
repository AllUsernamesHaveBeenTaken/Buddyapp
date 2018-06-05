defmodule BuddyWeb.Resolvers.Reactions do

  alias Buddy.Reactions

  def like_gig(_, %{gig_id: gig_id}, %{context: %{current_user: current_user}}) do
    with {:ok, message} <- Reactions.like_gig(gig_id, current_user.id) do
      {:ok, message}
    end
  end 

  def gig_is_liked(%{id: id}, _, %{context: %{current_user: current_user}}) do
    with {:ok, message} <- Reactions.gig_is_liked(id, current_user.id) do
      {:ok, message}
    end
  end
end