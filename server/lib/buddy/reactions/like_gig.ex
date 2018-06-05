defmodule Buddy.Reactions.LikeGig do
  use Ecto.Schema
  import Ecto.Changeset


  schema "like_gigs" do
    field :user_id, :id
    field :gig_id, :id

    timestamps()
  end

  @doc false
  def changeset(like_gig, attrs) do
    like_gig
    |> cast(attrs, [:user_id, :gig_id])
    |> validate_required([:user_id, :gig_id ])
  end
end
