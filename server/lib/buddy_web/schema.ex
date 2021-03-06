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

        @desc "Get list of gigs from friends"
        field :friends_gigs, list_of(:gig) do
        middleware Middleware.Authorize
            resolve &Resolvers.Posts.friends_gigs/3
        end

        @desc "Get a single gig by id"
        field :gig , :gig do
        middleware Middleware.Authorize        
            arg :id, non_null(:id)
            resolve &Resolvers.Posts.gig/3
        end

        @desc "Get all comments for a gig"
        field :comments, non_null(list_of(:comment)) do
            arg :gig_id, non_null(:id)
            middleware Middleware.Authorize
            resolve &Resolvers.Posts.get_comments/3            
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

        @desc "Create a gig"
        field :create_gig, :gig do
            arg :title, :string
            arg :location, non_null(:string)
            arg :when, non_null(:string)
            middleware Middleware.Authorize
            resolve &Resolvers.Posts.create_gig/3            
        end

        @desc "Create a comment on a gig"
        field :create_comment, :comment do
            arg :gig_id, non_null(:id)
            arg :text, non_null(:string)
            middleware Middleware.Authorize
            resolve &Resolvers.Posts.create_comment/3   
        end

        @desc "Going or not to a gig"
        field :going_gig, :boolean do
            arg :gig_id, non_null(:id)
            middleware Middleware.Authorize
            resolve &Resolvers.Reactions.going_gig/3
        end

        @desc "Befriend or Defriend"
        field :friend, :boolean do
            arg :friend_id, non_null(:id)
            middleware Middleware.Authorize
            resolve &Resolvers.Accounts.befriend/3
        end
    end
end