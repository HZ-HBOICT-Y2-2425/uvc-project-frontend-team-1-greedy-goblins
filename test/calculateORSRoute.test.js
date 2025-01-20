import { calculateORSRoute } from "../src/lib/calculators/distanceCalculator.mjs";  // adjust if the path is different
import { jest } from '@jest/globals';

// Mock the fetch function before testing
global.fetch = jest.fn();

describe("calculateORSRoute", () => {
  it("should correctly calculate distance and travel time from ORS API", async () => {
    // Mock a successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        routes: [
          {
            summary: {
              distance: 20000,  // meters (20 km)
              duration: 1800,   // seconds (30 min)
            },
          },
        ],
      }),
    });

    const result = await calculateORSRoute(52.5, 13.4, 48.8, 2.3, "driving-car");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      expect.objectContaining({
        method: "POST",
        headers: expect.any(Object),
        body: expect.any(String),
      })
    );
    expect(result).toEqual({ distanceKm: 20.0, travelTimeMinutes: 30 });
  });

  it("should throw an error for non-200 responses", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(calculateORSRoute(52.5, 13.4, 48.8, 2.3, "driving-car"))
      .rejects
      .toThrow("Fout bij het ophalen van routegegevens via OpenRouteService");
  });
});
