import {Button, Container} from "reactstrap";

export const Splash = () => {
    return (
        <div className='bg'>
            <Container className='d-flex flex-column justify-content-center align-items-center' style={{ height:'70vh' }}>
                <img
                    alt='luxorb'
                    src='/luxorb_black.png'
                    height='500'
                    />
                <Button href='/inventory'>Explore</Button>
            </Container>
        </div>
    )
}