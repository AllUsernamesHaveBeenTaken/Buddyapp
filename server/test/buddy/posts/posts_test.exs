defmodule Buddy.PostsTest do
  use Buddy.DataCase

  alias Buddy.Posts

  describe "gigs" do
    alias Buddy.Posts.Gig

    @valid_attrs %{favorite_count: 42, is_favorited: true, location: "some location", title: "some title", when: ~N[2010-04-17 14:00:00.000000]}
    @update_attrs %{favorite_count: 43, is_favorited: false, location: "some updated location", title: "some updated title", when: ~N[2011-05-18 15:01:01.000000]}
    @invalid_attrs %{favorite_count: nil, is_favorited: nil, location: nil, title: nil, when: nil}

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
      assert gig.favorite_count == 42
      assert gig.is_favorited == true
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
      assert gig.favorite_count == 43
      assert gig.is_favorited == false
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

  describe "gig_comments" do
    alias Buddy.Posts.Comment

    @valid_attrs %{text: "some text"}
    @update_attrs %{text: "some updated text"}
    @invalid_attrs %{text: nil}

    def comment_fixture(attrs \\ %{}) do
      {:ok, comment} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_comment()

      comment
    end

    test "list_gig_comments/0 returns all gig_comments" do
      comment = comment_fixture()
      assert Posts.list_gig_comments() == [comment]
    end

    test "get_comment!/1 returns the comment with given id" do
      comment = comment_fixture()
      assert Posts.get_comment!(comment.id) == comment
    end

    test "create_comment/1 with valid data creates a comment" do
      assert {:ok, %Comment{} = comment} = Posts.create_comment(@valid_attrs)
      assert comment.text == "some text"
    end

    test "create_comment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_comment(@invalid_attrs)
    end

    test "update_comment/2 with valid data updates the comment" do
      comment = comment_fixture()
      assert {:ok, comment} = Posts.update_comment(comment, @update_attrs)
      assert %Comment{} = comment
      assert comment.text == "some updated text"
    end

    test "update_comment/2 with invalid data returns error changeset" do
      comment = comment_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_comment(comment, @invalid_attrs)
      assert comment == Posts.get_comment!(comment.id)
    end

    test "delete_comment/1 deletes the comment" do
      comment = comment_fixture()
      assert {:ok, %Comment{}} = Posts.delete_comment(comment)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_comment!(comment.id) end
    end

    test "change_comment/1 returns a comment changeset" do
      comment = comment_fixture()
      assert %Ecto.Changeset{} = Posts.change_comment(comment)
    end
  end
end
