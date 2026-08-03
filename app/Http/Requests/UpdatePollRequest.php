<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePollRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'min:3', 'max:150'],
            'theme_text' => ['sometimes', 'string', 'max:150'],
            'theme_id' => ['sometimes', 'integer', 'exists:themes,id'],
        ];
    }
}
