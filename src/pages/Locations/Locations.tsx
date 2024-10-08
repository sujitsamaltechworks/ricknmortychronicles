import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
    useGetCharactersByLocation,
    useGetLocations,
} from '../../hooks/location.hook'

interface Location {
    id: number
    name: string
}

interface Props {}

const LocationsContainer = styled.div`
    padding: 20px;
`

const FilterSelect = styled.select`
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ccc;

    @media (max-width: 768px) {
        width: 100%;
    }
`

const CharactersList = styled.div`
    margin-top: 20px;
    max-height: 300px;
    overflow-y: auto;
`

const CharacterItem = styled.div`
    padding: 5px;
    border-bottom: 1px solid #ccc;

    &:last-child {
        border-bottom: none;
    }
`

const LoadingIndicator = styled.div`
    text-align: center;
    margin-top: 20px;
`

const ErrorText = styled.div`
    color: red;
    text-align: center;
    margin-top: 20px;
`

export default function LocationPage({}: Props) {
    const {
        data: locations,
        isLoading: locationsLoading,
        error: locationsError,
    } = useGetLocations()
    const [selectedLocation, setSelectedLocation] = useState<number | null>(
        null
    )
    const {
        data: characters,
        isLoading: charactersLoading,
        error: charactersError,
    } = useGetCharactersByLocation(selectedLocation)

    return (
        <LocationsContainer>
            {/* Handle loading and error states for locations */}
            {locationsLoading && (
                <LoadingIndicator>Loading locations...</LoadingIndicator>
            )}
            {locationsError && <ErrorText>Error loading locations</ErrorText>}

            {!locationsLoading && !locationsError && locations && (
                <FilterSelect
                    value={selectedLocation || ''}
                    onChange={(e) =>
                        setSelectedLocation(Number(e.target.value))
                    }
                >
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </FilterSelect>
            )}

            {/* Handle selected location's characters */}
            {selectedLocation && (
                <>
                    {charactersLoading && (
                        <LoadingIndicator>
                            Loading characters...
                        </LoadingIndicator>
                    )}
                    {charactersError && (
                        <ErrorText>Error loading characters</ErrorText>
                    )}

                    {characters && !charactersLoading && !charactersError && (
                        <CharactersList>
                            <h4>Characters in this location:</h4>
                            {characters.map((character: any) => (
                                <CharacterItem key={character.id}>
                                    {character.name}
                                </CharacterItem>
                            ))}
                        </CharactersList>
                    )}
                </>
            )}
        </LocationsContainer>
    )
}
