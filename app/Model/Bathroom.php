<?php
class Bathroom extends AppModel {

	public function getBathrooms()
	{
		return $this->find('all');
	}
}
