export const RestaurantsList = props => {
    if (!props.restaurants) {
        return <div>Loading...</div>
    }
    return <>
        {
            props.restaurants.map(restaurant => <div>
                <h1>{restaurant.name}</h1>
            </div>)
    

        }
    </>
}