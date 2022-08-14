import { Header } from "../App/src/Component";
import renderer from "react-test-renderer";
it('renders correctly across screens', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
});
