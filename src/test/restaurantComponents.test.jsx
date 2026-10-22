// src/test/restaurantComponents.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import SearchBar from '../components/restaurant/SearchBar';
import FilterPanel from '../components/restaurant/FilterPanel';
import TableCard from '../components/reservation/TableCard';
import Loading from '../components/common/Loading';
import ErrorBoundary from '../components/common/ErrorBoundary';

const mockRestaurant = {
  id: 101,
  name: 'L’Étoile Bistro',
  tagline: 'Artisanal French Bistro & Wine Cellar',
  cuisine: 'French',
  location: 'Downtown',
  address: '142 Grand Avenue, Suite 100, Downtown',
  rating: 4.9,
  reviewsCount: 382,
  priceRange: '$$$$',
  openingHours: '12:00 PM - 11:00 PM',
  image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c',
  description: 'Authentic Parisian culinary artistry.',
  features: ['Valet Parking', 'Sommelier on site'],
  availableTimeSlots: ['12:30 PM', '07:00 PM'],
  tables: [{ id: 'T-101', name: 'Table 1 (Window Alcove)', capacity: 2, type: 'Romantic', status: 'available' }]
};

describe('Experiment 1: Restaurant Reservation Component Testing', () => {
  // a) Test restaurant cards
  test('a) renders RestaurantCard with name, cuisine, rating, and trigger quick select', () => {
    const handleQuickSelect = vi.fn();
    render(
      <BrowserRouter>
        <RestaurantCard restaurant={mockRestaurant} onQuickSelect={handleQuickSelect} />
      </BrowserRouter>
    );

    expect(screen.getByText('L’Étoile Bistro')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
    expect(screen.getByText('Downtown')).toBeInTheDocument();

    const reserveBtn = screen.getByText('Reserve Table');
    fireEvent.click(reserveBtn);
    expect(handleQuickSelect).toHaveBeenCalledWith(mockRestaurant);
  });

  // b) Test restaurant search and cuisine filtering
  test('b) SearchBar input updates value and triggers clear', () => {
    const handleChange = vi.fn();
    const handleClear = vi.fn();

    const { rerender } = render(
      <SearchBar value="French" onChange={handleChange} onClear={handleClear} />
    );

    const input = screen.getByPlaceholderText(/Search by restaurant name/i);
    expect(input.value).toBe('French');

    fireEvent.change(input, { target: { value: 'Italian' } });
    expect(handleChange).toHaveBeenCalled();

    const clearBtn = screen.getByTitle('Clear search');
    fireEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  test('b) FilterPanel triggers location, cuisine and rating changes', () => {
    const onSelectLocation = vi.fn();
    const onSelectCuisine = vi.fn();
    const onSelectMinRating = vi.fn();
    const onReset = vi.fn();

    render(
      <FilterPanel
        locations={['All', 'Downtown', 'Midtown']}
        cuisines={['All', 'French', 'Italian']}
        selectedLocation="Downtown"
        onSelectLocation={onSelectLocation}
        selectedCuisine="French"
        onSelectCuisine={onSelectCuisine}
        minRating={4.5}
        onSelectMinRating={onSelectMinRating}
        onReset={onReset}
        totalResults={3}
      />
    );

    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'Midtown' } });
    expect(onSelectLocation).toHaveBeenCalledWith('Midtown');

    fireEvent.change(selects[1], { target: { value: 'Italian' } });
    expect(onSelectCuisine).toHaveBeenCalledWith('Italian');

    const resetBtn = screen.getByText('Reset Filters');
    fireEvent.click(resetBtn);
    expect(onReset).toHaveBeenCalled();
  });

  // c) Test table and time-slot selection
  test('c) TableCard handles selection and disabled states based on capacity and status', () => {
    const onSelect = vi.fn();
    const mockTable = {
      id: 'T-101',
      name: 'Table 1 (Window Alcove)',
      capacity: 4,
      type: 'Romantic',
      status: 'available',
      location: 'Window'
    };

    const { rerender } = render(
      <TableCard table={mockTable} isSelected={false} onSelect={onSelect} requiredGuests={2} />
    );

    expect(screen.getByText('Table 1 (Window Alcove)')).toBeInTheDocument();
    expect(screen.getByText(/Up to/i)).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();

    // Click to select
    fireEvent.click(screen.getByText('Table 1 (Window Alcove)'));
    expect(onSelect).toHaveBeenCalledWith(mockTable);

    // Test occupied table
    rerender(
      <TableCard
        table={{ ...mockTable, status: 'occupied' }}
        isSelected={false}
        onSelect={onSelect}
        requiredGuests={2}
      />
    );
    expect(screen.getByText('Occupied')).toBeInTheDocument();
  });

  // e) Test loading and error components
  test('e) renders Loading component with custom message and spinner', () => {
    render(<Loading message="Connecting to fine dining..." />);
    expect(screen.getByText('Connecting to fine dining...')).toBeInTheDocument();
  });

  test('e) renders ErrorBoundary without crashing for valid children', () => {
    render(
      <ErrorBoundary>
        <div>Reservation Protected Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Reservation Protected Content')).toBeInTheDocument();
  });
});
