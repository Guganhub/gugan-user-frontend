import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../Store/action';
import { Carousel, Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./home.css";

function Home() {
    let userName = useSelector((state) => state.user);
    let role = useSelector((state) => state.role);
    role = role.replace(/"/g, '');
    userName = userName.replace(/"/g, '');
    const dispatch = useDispatch();
    const handleLogout = () => {
      dispatch(clearUser());
      
    };
    
    return (
        <>
        <nav className='navba'>
        <div className="container mt-5 center header">
            <img  className="mx-2" src='https://i.etsystatic.com/17107555/r/il/ab552a/2144700977/il_1588xN.2144700977_csik.jpg' width="40px" height="40px"></img>
            TonyArts
               

                </div>
      {userName ? (
        <>
         
          
          <div className="container mt-5">
            <div className="row justify-content-end">
                <div className="col-auto">          
                Welcome {role},  {userName}!
                </div>
                <div className="col-auto">
                    <Link to="/">
                    <button className="btn btn-danger mr-2" onClick={handleLogout}>Logout</button>
                    </Link>
                </div>
            </div>
        </div>
       
            
        </>
       
      ) : (
        <>
         <div className="container mt-5">
            <div className="row justify-content-end">
                <div className="col-auto">          
                    <Link to="/signup">
                        <button className="btn btn-primary mr-2">
                            Signup
                        </button>
                    </Link>
                </div>
                <div className="col-auto">
                    <Link to="/login">
                        <button className="btn btn-success">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        </>
      )}
      {userName && role === 'Admin' && (
        <div className="container d-flex flex-row" >
       <div className="justify-content-start">
         <Link to="/admin">
                        <button className="btn btn-success">
                            Customer table
                        </button>
                 
                    </Link>
                    
        </div>
        <div className=" ms-3 justify-content-start">
        <Link to="/bar">
                        <button className="btn btn-primary">
                            Customer chart
                        </button>
                 
                    </Link>
        </div>
        </div>
      )}
       
    </nav>
    <div  className="container d-flex flex-row  mt-2" >
     <Carousel>
     <Carousel.Item id="slider">
       <img
         className="d-block w-100"
         src="https://www.device42.com/blog/wp-content/uploads/2023/03/14_01edge-cloud-computing.jpg"
         alt="First slide"
       />
       <Carousel.Caption>
         <h3>Cloud compute</h3>
        
       </Carousel.Caption>
     </Carousel.Item>
     <Carousel.Item>
       <img
         className="d-block w-100"
         src="https://www.device42.com/blog/wp-content/uploads/2023/03/14_01edge-cloud-computing.jpg"
         alt="First slide"
       />
       <Carousel.Caption>
         <h3>Cloud compute</h3>
        
       </Carousel.Caption>
     </Carousel.Item>
     {/* Add more Carousel.Items as needed */}
   </Carousel>
</div>
<div>
<Container className="my-5">
      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card>
            <Card.Img variant="top" src="https://png.pngtree.com/background/20230823/original/pngtree-pastel-pink-background-with-geometric-shapes-in-pink-green-red-and-picture-image_4789610.jpg" />
            <Card.Body>
              <Card.Title>Art</Card.Title>
              <Card.Text>
              Art is with pure form of passion
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGE2va5AsQVpa9Ntz3-Bm1xXxkkqqUAd1QFTdtOuHM3g&s" />
            <Card.Body>
              <Card.Title>Creativity</Card.Title>
              <Card.Text>
                Images with creativity is awesome.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL-J3hQA5rVfGwPQAx1wxo9ubpRxZz9xIzaR_YHbrl8lLSG_LyWETUVn1TjUUj7QD9w40&usqp=CAU" />
            <Card.Body>
              <Card.Title>Potraits</Card.Title>
              <Card.Text>
                Get lost with some potraits
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
</div>
<footer className="bg-light text-dark text-center py-3">
        &copy; 2024 TonyArts
      </footer>
        </>
    );
  }
  
  export default Home;
  