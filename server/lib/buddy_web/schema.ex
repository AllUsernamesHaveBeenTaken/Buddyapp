defmodule BuddyWeb.Schema do
    use Absinthe.Schema

    alias BuddyWeb.Resolvers

    import_types BuddyWeb.Schema.PostsTypes

    query do
        @desc "Get list of gigs"
        field :gigs, list_of(:gig) do
            resolve &Resolvers.Posts.gigs/3
        end

        @desc "Get a single gig by id"
        field :gig , :gig do
            arg :id, non_null(:id)
            resolve &Resolvers.Posts.gig/3
        end
    end
end