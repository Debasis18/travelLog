import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'
import { useCities } from '../contexts/CitiesCOntext'

function CountriesList() {
    const { cities, isLoading } = useCities()

    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message="Add city 1st" />

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => <CountryItem key={country.id} country={country} />)}
        </ul>
    )
}

export default CountriesList