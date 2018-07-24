defmodule BuddyWeb.Schema.PostsTypes do
    use Absinthe.Schema.Notation
    use Absinthe.Ecto, repo: Buddy.Repo

    import Ecto.Query

    alias BuddyWeb.Resolvers

    object :gig do
        field :id, non_null(:id)
        field :title, non_null(:string)
        field :location, non_null(:string)
        field :when, non_null(:string)
        field :favorite_count, :integer
        field :user, non_null(:user), resolve: assoc(:user)
        field :is_favorited, non_null(:boolean) do
            resolve &Resolvers.Reactions.gig_is_liked/3
        end
        field :is_going, non_null(:boolean) do
            resolve &Resolvers.Reactions.is_going_to_gig/3
        end

        field :inserted_at, non_null(:string)
        field :updated_at, non_null(:string)
    end

    object :comment do
        field :id, non_null(:id)
        field :text, non_null(:string)
        field :user, non_null(:user), resolve: assoc(:user)

        field :inserted_at, non_null(:string)
        field :updated_at, non_null(:string)
    end
end