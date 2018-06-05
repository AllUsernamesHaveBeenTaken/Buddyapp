defmodule BuddyWeb.Schema.PostsTypes do
    use Absinthe.Schema.Notation

    object :gig do
        field :id, non_null(:id)
        field :title, non_null(:string)
        field :location, non_null(:string)
        field :when, non_null(:string)
        field :favorite_count, :integer
        field :is_favorited, :boolean

        field :inserted_at, non_null(:string)
        field :updated_at, non_null(:string)
    end
end