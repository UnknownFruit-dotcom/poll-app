<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Poll;
use App\Actions\Polls\CreatePoll;
use App\Actions\Polls\AddOptions;
use App\Actions\Polls\ChooseOption;
use App\Http\Requests\StorePollRequest;
use App\Http\Requests\AddOptionsRequest;
use App\Http\Requests\ChooseOptionRequest;

class PollsController extends Controller
{
    public function index()
    {
        return Poll::all();
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
        return Poll::with('theme', 'options')->findOrFail($id);
    }

    public function addOptions(AddOptionsRequest $request, Poll $poll, AddOptions $action)
    {
        $options = $action->add($poll, $request->validated('options'));

        return response()->json($options, 201);
    }

    public function chooseOption(ChooseOptionRequest $request, Poll $poll, ChooseOption $action) {
        $userId = auth()->id();

        $userVote = $action->vote(
            $poll,
            $request->validated(),
            $userId
        );

        return response()->json($userVote, 201);
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
