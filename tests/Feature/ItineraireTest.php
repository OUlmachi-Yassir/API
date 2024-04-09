<?php

namespace Tests\Unit\Controllers;

use Tests\TestCase;
use App\Models\User;
use App\Models\Itineraire;
use App\Http\Controllers\ItineraireController;
use Illuminate\Http\Request;

class ItineraireControllerTest extends TestCase
{
    protected $itineraireController;

    public function setUp(): void
    {
        parent::setUp();
        $this->itineraireController = new ItineraireController();
    }

    public function test_it_can_get_all_itineraries()
    {
        $request = Request::create('/itineraires', 'GET');
        $response = $this->itineraireController->index($request);

        $this->assertEquals(200, $response->getStatusCode());
    }

    public function test_it_can_store_an_itinerary()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $request = new Request([
            'title' => 'Test Itinerary',
            'category' => 'Test Category',
            'duration' => 5,
            'image' => 'test.jpg',
        ]);

        $response = $this->itineraireController->store($request);

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertDatabaseHas('itineraires', ['title' => 'Test Itinerary']);
    }

}
