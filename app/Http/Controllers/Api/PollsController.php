<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Poll;
use App\Models\Theme;
use App\Models\User;
use App\Actions\Polls\CreatePoll;
use App\Actions\Polls\AddOptions;
use App\Actions\Polls\ChooseOption;
use App\Actions\Polls\UpdatePoll;
use App\Actions\Polls\UpdatePollStatus;
use App\Actions\Polls\GetPolls;

use App\Http\Requests\StorePollRequest;
use App\Http\Requests\AddOptionsRequest;
use App\Http\Requests\ChooseOptionRequest;
use App\Http\Requests\UpdatePollRequest;
use App\Http\Requests\UpdatePollStatusRequest;
use App\Http\Requests\GetPollsRequest;

class PollsController extends Controller
{
    public function index(GetPollsRequest $request, GetPolls $action)
    {
        $polls = $action->get($request->validated());
        
        return response()->json($polls, 200);
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
        $userId = auth('sanctum')->id();

        $poll = Poll::query()
            ->with(['theme', 'options'])
            ->findOrFail($id);

        $isOwner = $userId && (int) $poll->user_id === (int) $userId;

        $poll->load([
            'options' => function ($q) use ($userId, $isOwner) {
                if ($isOwner) {
                    $q->withCount('userVotes');
                }

                if ($userId) {
                    $q->withExists([
                        'userVotes as voted_for' => fn ($v) => $v->where('user_id', $userId),
                    ]);
                }
            },
        ]);

        return $poll;
    }

    public function showMy() 
    {
        return auth()->user()->polls()->get();
    }

    public function addOptions(AddOptionsRequest $request, Poll $poll, AddOptions $action)
    {
        $options = $action->add($poll, $request->validated('options'));

        return response()->json($options, 201);
    }

    public function chooseOption(ChooseOptionRequest $request, Poll $poll, ChooseOption $action) {
        $userId = auth('sanctum')->id();

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

    public function update(UpdatePollRequest $request, Poll $poll, UpdatePoll $action)
    {
        $poll = $action->update($poll, $request->validated());

        return response()->json($poll, 200);
    }

    public function changeStatus(UpdatePollStatusRequest $request, Poll $poll, UpdatePollStatus $action) {
        $poll = $action->change($poll, $request->validated());

        return response()->json($poll, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
