// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import Loading from './components/common/Loading';

// Experiment 2 a & b: Implement Lazy Loading and Code Splitting for application routes
const Home = lazy(() => import('./pages/Home'));
const RestaurantList = lazy(() => import('./pages/RestaurantList'));
const RestaurantDetail = lazy(() => import('./pages/RestaurantDetail'));
const TablesView = lazy(() => import('./pages/TablesView'));
const ReservationsHistory = lazy(() => import('./pages/ReservationsHistory'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Confirmation = lazy(() => import('./pages/Confirmation'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));

// Lazy load reservation step components
const ReservationLayout = lazy(() => import('./pages/reservation/ReservationLayout'));
const DateTimeStep = lazy(() => import('./pages/reservation/DateTimeStep'));
const TableStep = lazy(() => import('./pages/reservation/TableStep'));
const DetailsStep = lazy(() => import('./pages/reservation/DetailsStep'));
const SummaryStep = lazy(() => import('./pages/reservation/SummaryStep'));

export function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-brand-50 text-brand-900 font-sans selection:bg-gold-500 selection:text-brand-950">
        <Header />

        <main className="flex-1" id="main-content">
          <Suspense fallback={<Loading fullScreen message="Loading page components..." />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/tables" element={<TablesView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Nested Reservation Route: /reservation */}
              <Route
                path="/reservation"
                element={
                  <ProtectedRoute>
                    <ReservationLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="date-time" replace />} />
                <Route path="date-time" element={<DateTimeStep />} />
                <Route path="table" element={<TableStep />} />
                <Route path="details" element={<DetailsStep />} />
                <Route path="summary" element={<SummaryStep />} />
              </Route>

              {/* Protected Checkout & History Routes */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reservations"
                element={
                  <ProtectedRoute>
                    <ReservationsHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/confirmation"
                element={
                  <ProtectedRoute>
                    <Confirmation />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
