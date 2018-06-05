defmodule BuddyWeb.Schema.PostsTypes do
    use Absinthe.Schema.Notation

    alias BuddyWeb.Resolvers

    object :gig do
        field :id, non_null(:id)
        field :title, non_null(:string)
        field :location, non_null(:string)
        field :when, non_null(:string)
        field :favorite_count, :integer
        field :is_favorited, non_null(:boolean) do
            resolve &Resolvers.Reactions.gig_is_liked/3
        end

        field :inserted_at, non_null(:string)
        field :updated_at, non_null(:string)
    end
end