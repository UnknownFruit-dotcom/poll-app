<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateThemeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
            'sometimes',
            'string',
            'min:3',
            'max:150',
            Rule::unique('themes', 'name')->ignore($this->route('theme')),
        ],
        'active' => ['sometimes', 'boolean'],
        ];
    }
}
