defmodule BuddyWeb.Resolvers.Posts do

    alias Buddy.Posts

    def gigs(_, _, _) do
        {:ok, Posts.list_gigs}
    end

    def gig(_, %{id: id}, _) do
        {:ok, Posts.get_gig!(id)}
    end

    def create_gig(_, args, %{context: %{current_user: current_user}}) do
        args = Map.merge(args, %{user_id: current_user.id})
        with {:ok, gig} <- Posts.create_gig(args) do
            {:ok, gig}
        end
    end

    def create_comment(_, args, %{context: %{current_user: current_user}}) do
        args = Map.merge( args, %{user_id: current_user.id})
        with {:ok, comment} <- Posts.create_comment(args) do
            {:ok, comment}
        end
    end

    def get_comments(_, %{gig_id: gig_id}, _) do
        {:ok, Posts.get_comments_for_gig(gig_id)}
    end
end