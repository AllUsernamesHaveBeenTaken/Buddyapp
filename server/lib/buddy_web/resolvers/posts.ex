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
end