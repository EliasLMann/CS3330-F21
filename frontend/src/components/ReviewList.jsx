import React from "react";
import Card from 'react-bootstrap/Card';
import CardHeader from "react-bootstrap/esm/CardHeader";


export const ReviewList = (props) => {
    return (
        <>
        <div className="d-flex flex-row justify-content-center"> 
            <Card className="p-2 mx-l" style={{ width: '75%' }}>
                <Card.Body>
                <Card.Title className="text-rigth h1">Your Reviews ({!props.reviews.length ? 0 : props.reviews.length})</Card.Title>
                    <ul className="d-grid gap-3 mb-3 p-3 mx-auto" style={{ width: '100%' }}>
                        {
                            !props.reviews.length && <Card className="p-2 bg-light mb-1"> You have not left any reviews yet  </Card>
                        }

                        {
                            props.reviews.map((restReview, index) => (

                            <Card key={ index }>
                                <CardHeader>{ restReview.restaurantID }</CardHeader>
                                <Card.Body>
                                    {/* <div className="card-header"> { restReview.restaurantID } </div> */}
                                    <div className="row justify-content-evenly">
                                        <div className="text-rigth text-muted col-5">RATING</div>
                                        <div className="text-end text-muted col-5">{ restReview.date}</div>
                                    </div> 
                                    <div className="m-3">{ restReview.body }</div>
                                </Card.Body>
                            </Card>))
                        }
                    </ul>
                </Card.Body>
            </Card>
        </div>
   </>
    );
};

{/* <Card.Title class="text-rigth h2">Previous Reviews</Card.Title>
                        <Card className="p-2  my-3 mx-l" style={{ width: '37rem' }}>
                            <Card.Body>
                                <Card.Title class="text-rigth h2">Username</Card.Title>

                        
                            </Card.Body>
                        </Card> */}