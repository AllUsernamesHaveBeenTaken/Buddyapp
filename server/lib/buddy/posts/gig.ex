defmodule Buddy.Posts.Gig do
  use Ecto.Schema
  import Ecto.Changeset


  schema "gigs" do
    field :favorite_count, :integer
    field :is_favorited, :boolean, default: false
    field :location, :string
    field :title, :string
    field :when, :naive_datetime

    has_many :likes, Buddy.Reactions.LikeGig

    timestamps()
  end

  @doc false
  def changeset(gig, attrs) do
    gig
    |> cast(attrs, [:title, :location, :when, :favorite_count, :is_favorited])
    |> validate_required([:title, :location, :when])
  end
end
