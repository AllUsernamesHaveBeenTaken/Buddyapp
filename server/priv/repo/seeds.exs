alias Buddy.{Posts, Repo}

mock_gigs = 9

for idx <- 0..mock_gigs do
    gig = %{
        title: Faker.Pizza.pizza,
        location: Faker.Company.En.bullshit,
        when: Faker.DateTime.forward(10),
        favoriteCount: 0,
        isFavorited: false
    }

    %Posts.Gig{}
    |> Posts.Gig.changeset(gig)
    |> Repo.insert!
end