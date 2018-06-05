defmodule BuddyWeb.Schema do
    use Absinthe.Schema

    alias BuddyWeb.Resolvers
    alias BuddyWeb.Schema.Middleware

    import_types BuddyWeb.Schema.PostsTypes
    import_types BuddyWeb.Schema.AccountsTypes

    query do
        @desc "Get list of gigs"
        field :gigs, list_of(:gig) do
        middleware Middleware.Authorize
            resolve &Resolvers.Posts.gigs/3
        end

        @desc "Get a single gig by id"
        field :gig , :gig do
            arg :id, non_null(:id)
            resolve &Resolvers.Posts.gig/3
        end

    end

    mutation do
        @desc "Login as user"
        field :login, :user_session do
            arg :token, :string
            arg :provider, type: :provider
            resolve &Resolvers.Accounts.login/3
        end

        @desc "Like or dislike a gig"
        field :like_gig, :boolean do
            arg :gig_id, non_null(:id)
            middleware Middleware.Authorize
            resolve &Resolvers.Reactions.like_gig/3
        end
    end
end