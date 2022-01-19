import React, {useContext, useMemo, useEffect, useState} from 'react'
import {Button} from '@material-ui/core'
import { Icon } from 'components/ui'
import colors from 'lib/colors'
import { TableContext } from '../../../index'

export const AgeFilterChip = () => {
    const { filters, setFilters } = useContext(TableContext)

    const initialValues = useMemo(() => ({
        ...filters,
        endAge: 100,
        startAge: 0
    }))

    const label = `${filters?.startAge}-${filters?.endAge} y.o.`

    return (
        <>
            {
                filters?.startAge !== 0 || filters?.endAge !== 100
                    ?
                    <ChipStartIcon
                        label={label}
                        startIcon={<Icon icon='times' style={{ width: '14px' }} />}
                        onClick={() => setFilters(initialValues)}
                    />
                    : null
            }
        </>
    )
}
export const ResetFiltersChip = () => {
    const { filters, setFilters } = useContext(TableContext)
    const [displayed, setDisplayed] = useState(false)

    const defaultValues = useMemo(() => ({
        ...filters,
        endAge: 100,
        gender: [],
        location: "",
        startAge: 0
    }))

    useEffect(() => {
        const shouldDisplays = (filters?.startAge !== 0)
            || (filters?.endAge !== 100)
            || (filters?.location !== '')
            || (filters?.gender.length > 0)

        if (shouldDisplays) {
            setDisplayed(true)
        } else (
            setDisplayed(false)
        )
    }, [filters])

    return (
        <>
            {
                displayed
                    ?
                    <ChipStartIcon
                        label='Reset'
                        startIcon={<Icon icon='undo' style={{ width: '14px' }} />}
                        onClick={() => setFilters(defaultValues)}
                    />
                    : null
            }

        </>
    )
}
export const GenderFiltersChip = () => {
    const { filters, setFilters } = useContext(TableContext)

    const selectedGenders = filters?.gender

    function deleteFilter(gender) {
        const newGenderFilter = filters.gender.filter(item => item !== gender)
        setFilters({
            ...filters,
            gender: newGenderFilter
        })
    }

    return (
        <>
            {
                selectedGenders?.map((gender) => (
                    <ChipStartIcon
                        key={gender}
                        label={gender?.toLowerCase()}
                        startIcon={<Icon icon='times' style={{ width: '14px' }} />}
                        onClick={() => deleteFilter(gender)}
                    />
                ))
            }
        </>
    )
}

const ChipStartIcon = React.memo(({ label, startIcon, style, onClick }) => {
    return (
        <Button
            onClick={onClick}
            startIcon={startIcon}
            variant='outlined'
            style={{
                ...style,
                borderRadius: '10px',
                border: 'none',
                color: colors.orange100,
            }}
        >
            {label}
        </Button>
    )
})
