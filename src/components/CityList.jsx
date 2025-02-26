import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesCOntext'

function CityList() {
    const { cities, isLoading } = useCities()

    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message="Add city 1st" />
    return (
        <ul className={styles.cityList}>
            {cities.map((city) => <CityItem key={city.id} city={city} />)}
        </ul>
    )
}

export default CityList