import {
    AgeFilterChip, 
    ResetFiltersChip, 
    GenderFiltersChip
} from './filterChips'

export const PatientFilters = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ResetFiltersChip />
        <AgeFilterChip />
        <GenderFiltersChip />
      </div>
    )
  }
