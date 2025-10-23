import {Container} from "reactstrap";
import {TableColors} from "../components/TableColors.tsx";
import {TableProducts} from "../components/TableProducts.tsx";
import {TableVariants} from "../components/TableVariants.tsx";

export const Employee = () => {

    return (
        <Container className='flex-column'>
            <TableColors />
            <TableProducts />
            <TableVariants />
        </Container>
    )
}