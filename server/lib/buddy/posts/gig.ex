defmodule Buddy.Posts.Gig do
  use Ecto.Schema
  import Ecto.Changeset


  schema "gigs" do
    field :favorite_count, :integer
    field :is_favorited, :boolean, default: false
    field :location, :string
    field :title, :string
    field :when, :naive_datetime

    belongs_to :user, Buddy.Accounts.User

    has_many :likes, Buddy.Reactions.LikeGig

    timestamps()
  end

  @doc false
  def changeset(gig, attrs) do
    gig
    |> cast(attrs, [:title, :location, :when, :user_id])
    |> validate_required([:title, :location, :when, :user_id])
  end
end
