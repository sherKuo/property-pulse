'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchResultsPage = () => {
	const searchParams = useSearchParams();

	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	const location = searchParams.get('location');
	const propertyType = searchParams.get('propertyType');

	useEffect(() => {
		const fetchSearchResults = async () => {
			try {
			} catch (error) {
				console.log(error);
			}
		};

		fetchSearchResults();
	}, [location, propertyType]);

	return <div>SearchResultsPage</div>;
};

export default SearchResultsPage;
