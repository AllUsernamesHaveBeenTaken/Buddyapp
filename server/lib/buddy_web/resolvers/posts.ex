defmodule BuddyWeb.Resolvers.Posts do
    def gigs(_, _, _) do
        {:ok, Buddy.Posts.list_gigs}
    end

    def gig(_, %{id: id}, _) do
        {:ok, Buddy.Posts.get_gig!(id)}
    end
end