defmodule Buddy.ReactionTest do
  use Buddy.DataCase

  alias Buddy.Reaction

  describe "like_gigs" do
    alias Buddy.Reaction.LikeGig

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def like_gig_fixture(attrs \\ %{}) do
      {:ok, like_gig} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Reaction.create_like_gig()

      like_gig
    end

    test "list_like_gigs/0 returns all like_gigs" do
      like_gig = like_gig_fixture()
      assert Reaction.list_like_gigs() == [like_gig]
    end

    test "get_like_gig!/1 returns the like_gig with given id" do
      like_gig = like_gig_fixture()
      assert Reaction.get_like_gig!(like_gig.id) == like_gig
    end

    test "create_like_gig/1 with valid data creates a like_gig" do
      assert {:ok, %LikeGig{} = like_gig} = Reaction.create_like_gig(@valid_attrs)
    end

    test "create_like_gig/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Reaction.create_like_gig(@invalid_attrs)
    end

    test "update_like_gig/2 with valid data updates the like_gig" do
      like_gig = like_gig_fixture()
      assert {:ok, like_gig} = Reaction.update_like_gig(like_gig, @update_attrs)
      assert %LikeGig{} = like_gig
    end

    test "update_like_gig/2 with invalid data returns error changeset" do
      like_gig = like_gig_fixture()
      assert {:error, %Ecto.Changeset{}} = Reaction.update_like_gig(like_gig, @invalid_attrs)
      assert like_gig == Reaction.get_like_gig!(like_gig.id)
    end

    test "delete_like_gig/1 deletes the like_gig" do
      like_gig = like_gig_fixture()
      assert {:ok, %LikeGig{}} = Reaction.delete_like_gig(like_gig)
      assert_raise Ecto.NoResultsError, fn -> Reaction.get_like_gig!(like_gig.id) end
    end

    test "change_like_gig/1 returns a like_gig changeset" do
      like_gig = like_gig_fixture()
      assert %Ecto.Changeset{} = Reaction.change_like_gig(like_gig)
    end
  end
end
