defmodule Buddy.Posts.Gig do
  use Ecto.Schema
  import Ecto.Changeset


  schema "gigs" do
    field :favoriteCount, :integer
    field :isFavorited, :boolean, default: false
    field :location, :string
    field :title, :string
    field :when, :naive_datetime

    has_many :likes, Buddy.Reactions.LikeGig

    timestamps()
  end

  @doc false
  def changeset(gig, attrs) do
    gig
    |> cast(attrs, [:title, :location, :when, :favoriteCount, :isFavorited])
    |> validate_required([:title, :location, :when])
  end
end
