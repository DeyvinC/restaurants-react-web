import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rate, Button } from "antd";

export default function RestaurantDetails() {
  const [restaurant, setRestaurant] = useState({}); 
  const [rating, setRating] = useState();
  const params = useParams();

  const handleRating = () => {
    fetch(`https://bocacode-intranet-api.web.app/restaurants/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: rating }),
    })
    .then(response => response.json())
    .then(() => setRating(0))
    .catch(alert)
  }

  useEffect(() => {
    fetch(`https://bocacode-intranet-api.web.app/restaurants/${params.id}`)
      .then((response) => response.json())
      .then((data) => setRestaurant(data))
      .catch(alert);
  }, [rating]);

  if (!restaurant.photoUrl) {
    return <p>Loading</p>;
  }

  return (
    <div className="detail-restaurant-bg">
    <section className="detail-wrapper">
      <img src={restaurant.photoUrl} alt={`IPhoto of ${restaurant.name}`} />
      <div className="detail-restaurant-wrapper">
      <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 0 }}>
        {" "}
        {restaurant.name}
      </h1>
      <Rate disabled defaultValue={restaurant.rating} />
      <span> ({restaurant.numRatings})</span>
      <hr />
      <h3> {restaurant.address}</h3>
      <hr />
      <h2 style={{ marginTop: "20px", fontSize: 28, fontWeight: 700 }}>
        {" "}
        Rate {restaurant.name}
      </h2>
      <p>Please add your rating</p>
      <Rate value={rating}onChange={(value) => setRating(value)} />
      <Button onClick={handleRating} type="primary" size={"large"} style={{marginTop: '20px'}}>Submit Rating</Button>
    </div>
    </section>
    </div>
  );
}