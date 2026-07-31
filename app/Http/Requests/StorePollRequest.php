<?php

namespace App\Http\Requests;

use App\Enums\Status;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StorePollRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:150'],
            'theme_text' => ['nullable', 'required_without:theme_id', 'string', 'max:150'],
            'theme_id' => ['nullable', 'required_without:theme_text', 'integer', 'exists:themes,id'],
            'status' => ['nullable', Rule::enum(Status::class)],
            'published_at' => ['nullable', 'date'],
            
            'options' => ['array', 'max:10'],
            'options.*' => ['required', 'string', 'max:255', 'distinct'],
        ];
    }
}
