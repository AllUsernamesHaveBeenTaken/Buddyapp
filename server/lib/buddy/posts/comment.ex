defmodule Buddy.Posts.Comment do
  use Ecto.Schema
  import Ecto.Changeset


  schema "gig_comments" do
    field :text, :string

    belongs_to :user, Buddy.Accounts.User
    belongs_to :gig, Buddy.Posts.Gig

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:text, :user_id, :gig_id])
    |> validate_required([:text, :user_id, :gig_id])
  end
end
