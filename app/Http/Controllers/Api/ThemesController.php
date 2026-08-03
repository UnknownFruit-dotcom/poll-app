<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\StoreThemeRequest;
use App\Http\Requests\UpdateThemeRequest;
use App\Http\Controllers\Controller;
use App\Actions\Themes\UpdateTheme;
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

    public function update(UpdateThemeRequest $request, Theme $theme, UpdateTheme $action)
    {
        $theme = $action->update($theme, $request->validated());

        return response()->json($theme, 200);
    }

    public function destroy(string $id)
    {
        $theme = Theme::find($id);
        $theme->delete();
    }
}
