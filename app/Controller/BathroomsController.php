<?php
class BathroomsController extends AppController {

       /* public function beforeFilter()
        {
                parent::beforeFilter();
                $this->Auth->allow('upload'); //Allows anyone to upload files
        } */

        public function upload()
        {
                if ($this->request->is('post'))
                {
			CakeLog::write('debug', $this->request->data);
			
			if ($this->Bathroom->save($this->request->data))
			{
				$this->redirect(array('controller' => 'pages', 'action' => 'display', 'home'));
			}	
                }
		$this->redirect(array('controller' => 'pages', 'action' => 'display', 'home'));
        }
}
