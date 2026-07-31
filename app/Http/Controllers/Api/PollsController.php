<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Poll;
use App\Actions\Polls\CreatePoll;
use App\Http\Requests\StorePollRequest;

class PollsController extends Controller
{
    public function index()
    {
        return Poll::with('options')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function store(StorePollRequest $request, CreatePoll $action)
    {
        $poll = $action->create($request->validated());

        return response()->json($poll, 201);
    }

    public function show(string $id)
    {
        $poll = Poll::find($id);
        return $poll::with('theme')->get();
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
