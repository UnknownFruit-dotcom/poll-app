<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\StoreThemeRequest;
use App\Http\Controllers\Controller;
use App\Models\Theme;

class ThemesController extends Controller
{
    public function index()
    {
        return Theme::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(StoreThemeRequest $request)
    {
        $theme = Theme::create($request->validated());

        return response()->json($theme, 201);
    }

    public function show(string $id)
    {
        return Theme::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        $theme = Theme::find($id);
        $theme->delete();
    }
}
