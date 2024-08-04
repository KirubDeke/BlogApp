import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import '../styles/RecentPostsStyle.css';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import Button from 'react-bootstrap/esm/Button';

function GroupExample() {
  return (
    <>
      <div className="recent-posts-description">
        <h3>Recent Posts</h3>
        <p>New posts added weekly. Dive in!</p>
      </div>
      <CardGroup>
        <Card className="mr-5 shadow-sm">
          <Card.Img variant="top" src={img1} style={{ height: '200px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </Card.Text>
            <a href="#" className="btn btn-primary">Read More</a>
          </Card.Body>
          <Card.Footer className="bg-white border-0">
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card className="mx-5 shadow-sm">
          <Card.Img variant="top" src={img2} style={{ height: '200px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.{' '}
            </Card.Text>
            <a href="#" className="btn btn-primary">Read More</a>
          </Card.Body>
          <Card.Footer className="bg-white border-0">
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card className="ml-5 shadow-sm">
          <Card.Img variant="top" src={img3} style={{ height: '200px', objectFit: 'cover' }} />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This card has even longer content than the
              first to show that equal height action.
            </Card.Text>
            <a href="#" className="btn btn-primary">Read More</a>
          </Card.Body>
          <Card.Footer className="bg-white border-0">
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
      <div className="d-flex justify-content-end align-items-center">
          <Button className="see-more">
            See More
         </Button>
     </div>
    </>
  );
}

export default GroupExample;