import Banner from './Banner';
import Movies from './Movies';
import Counter from './Counter';
//import Todoredux from './Todoredux';


const Home = () => {
    return (
        <div>
            <Banner/>
           {  <Movies/> }
           <Counter/>
           {/*<Todoredux/> */}
        </div>
    );
}

export default Home;
