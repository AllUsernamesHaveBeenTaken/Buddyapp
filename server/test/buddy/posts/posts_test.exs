defmodule Buddy.PostsTest do
  use Buddy.DataCase

  alias Buddy.Posts

  describe "gigs" do
    alias Buddy.Posts.Gig

    @valid_attrs %{favoriteCount: 42, isFavorited: true, location: "some location", title: "some title", when: ~N[2010-04-17 14:00:00.000000]}
    @update_attrs %{favoriteCount: 43, isFavorited: false, location: "some updated location", title: "some updated title", when: ~N[2011-05-18 15:01:01.000000]}
    @invalid_attrs %{favoriteCount: nil, isFavorited: nil, location: nil, title: nil, when: nil}

    def gig_fixture(attrs \\ %{}) do
      {:ok, gig} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_gig()

      gig
    end

    test "list_gigs/0 returns all gigs" do
      gig = gig_fixture()
      assert Posts.list_gigs() == [gig]
    end

    test "get_gig!/1 returns the gig with given id" do
      gig = gig_fixture()
      assert Posts.get_gig!(gig.id) == gig
    end

    test "create_gig/1 with valid data creates a gig" do
      assert {:ok, %Gig{} = gig} = Posts.create_gig(@valid_attrs)
      assert gig.favoriteCount == 42
      assert gig.isFavorited == true
      assert gig.location == "some location"
      assert gig.title == "some title"
      assert gig.when == ~N[2010-04-17 14:00:00.000000]
    end

    test "create_gig/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_gig(@invalid_attrs)
    end

    test "update_gig/2 with valid data updates the gig" do
      gig = gig_fixture()
      assert {:ok, gig} = Posts.update_gig(gig, @update_attrs)
      assert %Gig{} = gig
      assert gig.favoriteCount == 43
      assert gig.isFavorited == false
      assert gig.location == "some updated location"
      assert gig.title == "some updated title"
      assert gig.when == ~N[2011-05-18 15:01:01.000000]
    end

    test "update_gig/2 with invalid data returns error changeset" do
      gig = gig_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_gig(gig, @invalid_attrs)
      assert gig == Posts.get_gig!(gig.id)
    end

    test "delete_gig/1 deletes the gig" do
      gig = gig_fixture()
      assert {:ok, %Gig{}} = Posts.delete_gig(gig)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_gig!(gig.id) end
    end

    test "change_gig/1 returns a gig changeset" do
      gig = gig_fixture()
      assert %Ecto.Changeset{} = Posts.change_gig(gig)
    end
  end
end
