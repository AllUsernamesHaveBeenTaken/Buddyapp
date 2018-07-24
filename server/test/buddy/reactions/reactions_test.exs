defmodule Buddy.ReactionsTest do
  use Buddy.DataCase

  alias Buddy.Reactions

  describe "going_gigs" do
    alias Buddy.Reactions.GoingGig

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def going_gig_fixture(attrs \\ %{}) do
      {:ok, going_gig} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Reactions.create_going_gig()

      going_gig
    end

    test "list_going_gigs/0 returns all going_gigs" do
      going_gig = going_gig_fixture()
      assert Reactions.list_going_gigs() == [going_gig]
    end

    test "get_going_gig!/1 returns the going_gig with given id" do
      going_gig = going_gig_fixture()
      assert Reactions.get_going_gig!(going_gig.id) == going_gig
    end

    test "create_going_gig/1 with valid data creates a going_gig" do
      assert {:ok, %GoingGig{} = going_gig} = Reactions.create_going_gig(@valid_attrs)
    end

    test "create_going_gig/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Reactions.create_going_gig(@invalid_attrs)
    end

    test "update_going_gig/2 with valid data updates the going_gig" do
      going_gig = going_gig_fixture()
      assert {:ok, going_gig} = Reactions.update_going_gig(going_gig, @update_attrs)
      assert %GoingGig{} = going_gig
    end

    test "update_going_gig/2 with invalid data returns error changeset" do
      going_gig = going_gig_fixture()
      assert {:error, %Ecto.Changeset{}} = Reactions.update_going_gig(going_gig, @invalid_attrs)
      assert going_gig == Reactions.get_going_gig!(going_gig.id)
    end

    test "delete_going_gig/1 deletes the going_gig" do
      going_gig = going_gig_fixture()
      assert {:ok, %GoingGig{}} = Reactions.delete_going_gig(going_gig)
      assert_raise Ecto.NoResultsError, fn -> Reactions.get_going_gig!(going_gig.id) end
    end

    test "change_going_gig/1 returns a going_gig changeset" do
      going_gig = going_gig_fixture()
      assert %Ecto.Changeset{} = Reactions.change_going_gig(going_gig)
    end
  end
end
