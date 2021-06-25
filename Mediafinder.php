<?php namespace Drhuy\Scamers\FormWidgets;

use Backend\Classes\FormWidgetBase;

/**
 * mediafider Form Widget
 */
class Mediafinder extends FormWidgetBase
{
    /**
     * @inheritDoc
     */
    protected $defaultAlias = 'drhuy_scamers_mediafinder';

    /**
     * @var string Display mode for the selection. Values: file, image.
     */
    public $mode = 'any';

    /**
     * @var int Preview image width
     */
    public $imageWidth = 150;

    /**
     * @var int Preview image height
     */
    public $imageHeight = 150;

    /**
     * @inheritDoc
     */
    public function init()
    {
        $this->fillFromConfig([
            'mode',
            'prompt',
            'imageWidth',
            'imageHeight'
        ]);
    }

    /**
     * @inheritDoc
     */
    public function render()
    {
        $this->prepareVars();
        return $this->makePartial('mediafinder');
    }

    /**
     * Prepares the form widget view data
     */
    public function prepareVars()
    {
        $this->vars['name'] = $this->formField->getName();
        $this->vars['value'] = $this->getLoadValue();
        $this->vars['model'] = $this->model;
        $this->vars['mode'] = $this->mode;
        $this->vars['imageWidth'] = $this->imageWidth;
        $this->vars['imageHeight'] = $this->imageHeight;
    }

    /**
     * @inheritDoc
     */
    public function loadAssets()
    {
        $this->addCss('css/mediafider.css', 'drhuy.scamers');
        $this->addJs('js/mediaItem.js', 'drhuy.scamers');
        $this->addJs('js/mediafider.js', 'drhuy.scamers');
    }

    /**
     * @inheritDoc
     */
    public function getSaveValue($value)
    {
        return $value;
    }
}
