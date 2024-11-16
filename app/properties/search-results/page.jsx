'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchResultsPage = () => {
	const searchParams = useSearchParams();

	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	// grabbing params from the URL
	const location = searchParams.get('location');
	const propertyType = searchParams.get('propertyType');
	// console.log('grabbing searchParams(): ', location, propertyType);

	useEffect(() => {
		const fetchSearchResults = async (location, propertyType) => {
			try {
				const res = await fetch(
					`/api/properties/search?location=${location}&propertyType=${propertyType}`
				);

				if (res.status === 200) {
					const data = await res.json();
					setProperties(data);
					console.log(data);
				} else {
					setProperties([]);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		// Remember to call the funciton
		fetchSearchResults();
	}, [location, propertyType]);

	console.log('properties array: ', properties);

	return <div>SearchResultsPage</div>;
};

export default SearchResultsPage;
