<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

    /**
 * @OA\Info(
 *      version="1.0.0",
 *      title="Your API Title",
 *      description="Your API Description",
 *      @OA\Contact(
 *           email="ytoop66@gmail.com",
 *          name="OLM yassir"
 *      )
 *  
 * )
 */
class Controller extends BaseController
{





    use AuthorizesRequests, ValidatesRequests;



}
