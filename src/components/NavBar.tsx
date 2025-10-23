import {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export const NavBar = (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar {...args}>
                <NavbarBrand href="/">
                    <img
                        alt='logo'
                        src='/bf_logo.png'
                        style={{
                            height: 50,
                            width: 50,
                            marginRight: 10
                        }}
                    />
                    BRIGHTFORGE</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/inventory">SHOP</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/employee">ADMIN (employees only)</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}